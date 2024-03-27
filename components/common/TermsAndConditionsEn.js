import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TermsAndConditionsEn = ({ changeLang, onHide }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 22,
      }}
    >
      <View>
        <Pressable onPress={onHide}>
          <Ionicons name="close" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 10 }}>
        Terms And Conditions
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0d6efd",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginBottom: 30,
          }}
          onPress={changeLang}
        >
          <Text style={{ color: "#fff" }}>English</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Text>
          Terms and conditions in muze y network we are pleased to work with you
        </Text>
        <Text>{"\n"}</Text>
        <View>
          <View>
            <Text>1. First welcome to muze y network </Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Unless otherwise agreed in writing with Muze Y Network, your
                  agreement will include the terms and conditions set forth in
                  this document, which will be referred to hereinafter as the
                  “General Terms”.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Your agreement with Muze Y Network also includes the terms of
                  any legal notices applicable to the Services, in addition to
                  the Additional Terms contained herein. These additional terms
                  will be available for you to read within, or through your use
                  of, the Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  The General Terms and Additional Terms constitute a legally
                  binding agreement between you and Muze Y Network regarding
                  your use of the Services. It is important that you take the
                  time to read them carefully. This legal agreement is referred
                  to below as the “Terms”.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>2. Acceptance of Terms</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  In order to use the Services, you must first agree to the
                  Terms, and you may not use the Services until you have
                  accepted the Terms.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You can accept the Terms by either of the following two steps:
                  (a) Clicking to accept or agree to the Terms, where this
                  option is made available to you by Muze Y Network k in the
                  user interface for any Service; or (b) By actually using the
                  Services. In this case, you understand and agree that Muze Y
                  Network will treat your use of the Services as acceptance of
                  the Terms from that point onwards.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  In order to enjoy the services, you must be within the legal
                  age that allows you to enter into a binding contract with Muze
                  Y Network.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>3. Language of Terms</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Where Muze Y Network provides you with a translation of the
                  English version of the Terms, you agree that the translation
                  is provided for your convenience only and that the English
                  version of the Terms will govern your relationship with Muze Y
                  Network.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>4. Provision of Services</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Muze y network has subsidiaries and affiliated companies
                  around the world (“Subsidiaries and Affiliates”). These
                  companies will sometimes provide you with Services on behalf
                  of Muze Y Network itself. Accordingly, you acknowledge and
                  agree that Subsidiaries and Affiliates will be entitled to
                  provide you with Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Muze y network is constantly innovating in order to provide
                  its users with the best possible experience. Accordingly, you
                  acknowledge and agree that the form and nature of the Services
                  provided may change from time to time without prior notice to
                  you.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You acknowledge and agree that Muze Y Network may stop
                  (permanently or temporarily) providing Services (or any
                  features within Services) to you or users generally at its
                  sole discretion without prior notice.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>5. Your Use of Services</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  In order to access certain Services, you may be required to
                  provide information about yourself (such as identification or
                  contact details) as part of the registration process for
                  Service, or as part of your continued use of Services. You
                  agree that any information you provide to Muze Y Network will
                  always be accurate, correct and up-to-date.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree to use Services only for purposes permitted by (a)
                  these Terms and (b) any applicable law, regulation or
                  generally accepted practices or guidelines in relevant
                  jurisdictions (including any laws regarding export control).
                  you.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree not to access (or attempt to access) any Service by
                  any means other than through the interface provided by Muze Y
                  Network unless specifically authorized by a separate agreement
                  with Muze Y Network
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree not to engage in any activity that interferes with
                  or disrupts Services (or servers and networks connected to
                  Services).
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Unless expressly authorized by a separate agreement with Muze
                  Y Network, you agree not to reproduce, duplicate, copy, sell,
                  trade or resell Services for any purpose.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree that you are solely responsible (and that Muze Y
                  Network has no responsibility towards you or any third party)
                  for any breach of your obligations under these Terms and for
                  any consequences (including loss or damage suffered by Muze Y
                  Network) arising from such breach.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>6. Password Security and Your Account</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  You acknowledge and agree that you are responsible for
                  maintaining confidentiality of passwords associated with any
                  account used to access Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Accordingly, you agree that you will be solely responsible for
                  all activities that occur under your account. you.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>7. Content in Services</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  You acknowledge that all information (such as data files,
                  written text, computer software, music, audio files or other
                  sounds, photographs, videos or other images) which may have
                  access as part of or through your use of Services is sole
                  responsibility of person from whom such content originated.
                  All such information is referred herein as “Content”.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You should be aware that Content presented as part of Services
                  including but without limiting the advertisements and
                  sponsorship of content within the Services may be protected by
                  intellectual property rights owned by the sponsoring or
                  advertising entities that provide such content to Muze Y
                  Network (or owned by individuals or companies on their
                  behalf). Therefore, you may not modify, rent, lease, loan,
                  sell, distribute or create derivative works based on such
                  content (either in whole or in part) unless you are expressly
                  notified by Muze Y Network or the owners of such content that
                  you may do so under a separate agreement.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Muze y network reserves the right (but has no obligation) to
                  pre-screen, review, flag, filter, modify, refuse or remove any
                  or all Content from any Service.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You understand that by using the Services you may be exposed
                  to Content that you may find offensive, indecent or
                  objectionable and that, in this respect, you use the Services
                  at your own risk.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree that you are solely responsible (and that Muze Y
                  Network has no responsibility to you or any third party) for
                  any Content that you create, transmit or display while using
                  the Services and for any consequences thereof.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>8. Proprietary Right </Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  You acknowledge and agree that Muze Y Network (or its
                  licensors) own all legal right, title and interest in and to
                  the Services, including any intellectual property rights which
                  subsist in the Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Unless you have agreed otherwise in writing with Muze Y
                  Network, nothing in these Terms gives you a right to use any
                  of Muze Y Network’s trade names, trademarks, service marks,
                  logos, domain names and other distinctive brand features.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree not to remove, obscure or alter any proprietary
                  rights notices (including copyright and trademark notices)
                  which may be affixed to or contained within the Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Unless you have been expressly authorized to do so in writing
                  by Muze Y Network, you agree that in using the Services, you
                  will not use any trademark, service mark, trade name or logo
                  of any company or organization in a way that is likely or
                  intended to cause confusion about the owner or authorized user
                  of such marks, names or logos.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>9. License from Muze Y Network</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Muze y network grants you a personal worldwide royalty-free
                  non-assignable and non-exclusive license to use software
                  provided to you by Muze Y Network as part of Services provided
                  to you. This license is for sole purpose of enabling you to
                  use and enjoy benefit of Services as provided by Muze Y
                  Network in manner permitted by these Terms.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You may not (and may not permit anyone else to) copy, modify,
                  create a derivative work from reverse engineer decompile or
                  otherwise attempt to extract source code of software or any
                  part thereof unless this is expressly permitted or required by
                  law or unless you have been specifically told that you may do
                  so by Muze Y Network in writing.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Unless Muze Y Network has given you specific written
                  permission to do so (either by an express license grant or
                  through transfer of ownership), you may not assign (or grant a
                  sublicense of) your rights to use software grant a security
                  interest in or over your rights to use software or otherwise
                  transfer any part of your rights to use software.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>10. Content License from You</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  You retain copyright and any other rights you already hold in
                  Content which you submit post or display on or through
                  Services. By submitting posting or displaying Content you give
                  Muze Y Network a perpetual irrevocable worldwide royalty-free
                  and non-exclusive license to reproduce adapt modify translate
                  publish publicly perform publicly display and distribute such
                  Content for sole purpose of enabling Muze Y Network to display
                  distribute and promote Services subject to withdrawal for
                  certain Services as specified in Additional Terms for those
                  Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You agree that this license includes right for Muze Y Network
                  to make such Content available to other companies
                  organizations or individuals with whom Muze Y Network has
                  relationships for provision of syndicated services and to use
                  such Content in connection with provision of those services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You confirm and warrant to Muze Y Network that you have all
                  rights powers and authority necessary to grant above license.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>11. Software Updates</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  The software which you use may automatically download and
                  install updates from time-to-time from Muze Y Network. These
                  updates are designed to improve enhance and further develop
                  Services and raise its level and may be in the form of bug
                  fixes or improved functionality or new software installations
                  or entirely new versions. And you agree to receive such
                  updates (and allow Muze Y Network to deliver them to you) as
                  part of your use of the Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>12. Terminating Your Relationship with Muze Y Network</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  The Terms will continue to apply until terminated by either
                  you or Muze Y Network as set out below. If you want to
                  terminate your legal agreement with Muze Y Network, you may do
                  so by (a) notifying Muze Y Network at any time and (b) closing
                  your accounts for all Services which you use. Muze Y Network
                  may at any time terminate its legal agreement with you if: (a)
                  You have breached any provision of the Terms; (b) If providing
                  the Services to you becomes unlawful; © The partner with whom
                  Muze Y Network offered the Services to you has terminated its
                  relationship with the company or ceased to offer the Service
                  to you; (d) Muze y network decides to stop providing the
                  Services to all users in the country in which you reside or
                  from which you use the Service; or (e) Providing the Service
                  to you is no longer commercially viable.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>13. Exclusion of Warranties</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Nothing in these Terms shall exclude or limit Muze Y Network’s
                  warranty or liability for losses which may not be lawfully
                  excluded or limited by applicable law. Some jurisdictions do
                  not allow exclusion of certain warranties or conditions or
                  limitation of liability for loss or damage caused by
                  negligence, breach of contract or breach of implied terms, or
                  incidental or consequential damages. Accordingly, only
                  limitations that are lawful in your jurisdiction will apply to
                  you and our liability will be limited to maximum extent
                  permitted by law.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You expressly understand and agree that your use of Services
                  is at your sole risk and that Services are provided “as is”
                  and “as available”.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  In particular, Muze Y Network, its subsidiaries and
                  affiliates, and its licensors do not represent or warrant to
                  you that: (a) Your use of Services will meet your
                  requirements; (b) Your use of Services will be uninterrupted,
                  timely, secure or free from error; © Any information obtained
                  by you as a result of your use of Services will be accurate or
                  reliable; and (d) That defects in operation or functionality
                  of any software provided to you as part of Services will be
                  corrected.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Any material downloaded or otherwise obtained through use of
                  Services is done at your own discretion and risk and that you
                  will be solely responsible for any damage to your computer
                  system or other device or loss of data that results from
                  download of any such material.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  No advice or information, whether oral or written, obtained by
                  you from Muze Y Network or through or from Services shall
                  create any warranty not expressly stated in Terms.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  Muze y network further expressly disclaims all warranties and
                  conditions of any kind, whether express or implied, including
                  but not limited to implied warranties and conditions of
                  merchantability, fitness for a particular purpose and
                  non-infringement.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>14. Limitation of Liability</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Subject to overall provision in paragraph above, you expressly
                  understand and agree that Muze Y Network, its subsidiaries and
                  affiliates, and its licensors shall not be liable to you for:
                  (a) Any direct, indirect, incidental, special consequential or
                  exemplary damages which may be incurred by you, however caused
                  and under any theory of liability. This shall include but not
                  be limited to any loss of profit (whether incurred directly or
                  indirectly), any loss of goodwill or business reputation, any
                  loss of data suffered, cost of procurement of substitute goods
                  or services, or other intangible loss; (b) Any loss or damage
                  which may be incurred by you,
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>15. Advertisements</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Some Services are supported by advertising revenue and may
                  display advertisements and promotions. These advertisements
                  may be targeted to content information stored on Services
                  queries made through Services or other information.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  In consideration for Muze Y Network granting you access to and
                  use of Services, you agree that Muze Y Network may place such
                  advertising on Services.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>16. Changes to Terms</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Muze y network may make changes to General Terms or Additional
                  Terms from time to time. You will be provided with any
                  Additional Terms within or through the Services to which the
                  changes apply.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You understand and agree that if you use the Services after
                  the date on which the General Terms or Additional Terms have
                  changed, then Muze Y Network will consider your use of the
                  Services as acceptance of the amended General Terms and
                  Additional Terms.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>17. General Legal Terms</Text>
            <Text>{"\n"}</Text>
            <View>
              <View>
                <Text>
                  Sometimes when you use the Services, you may (as a result of,
                  or through your use of the Services) use a service or download
                  a piece of software, or purchase goods, which are provided by
                  another person or company. Your use of these other services,
                  software or goods may be subject to separate terms between you
                  and the company or person concerned. If so, the Terms do not
                  affect your legal relationship with these other companies or
                  individuals.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  You acknowledge and agree that each member of group of
                  companies of which Muze Y Network is parent shall be third
                  party beneficiary to Terms and that such other companies shall
                  be entitled to directly enforce and rely upon any provision of
                  Terms which confers benefit on (or rights in favor of) them.
                  Other than this, no other person or company shall be third
                  party beneficiary to Terms.
                </Text>
                <Text>{"\n"}</Text>
              </View>
              <View>
                <Text>
                  The Terms, and your relationship with Muze Y Network under the
                  Terms, shall be governed by laws of Arab Republic of Egypt
                  without regard to its conflict of laws provisions.
                </Text>
                <Text>{"\n"}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsEn;

const styles = StyleSheet.create({});
